import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { MOCK_POSTS, MOCK_BROADCASTS } from '../constants';
import { Post, Broadcast, Role } from '../types';
import { Skeleton } from '../components/ui/Skeleton';
import { SuggestedUsers } from '../components/SuggestedUsers';
import { TrendingTopics } from '../components/TrendingTopics';
import { BroadcastCard } from '../components/BroadcastCard';
import { FeedPostCard } from '../components/FeedPostCard';
import { Card } from '../components/ui/Card';
import { CreatePostCard } from '../components/CreatePostCard';
import { CreatePostModal } from '../components/CreatePostModal';

const PostSkeleton: React.FC = () => (
    <Card className="mb-4">
        <div className="flex items-center space-x-3 p-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
            </div>
        </div>
        <Skeleton className="h-4 w-5/6 mx-4 mb-2" />
        <Skeleton className="h-4 w-4/6 mx-4 mb-4" />
        <Skeleton className="w-full h-[400px] rounded-none" />
        <div className="p-2 flex justify-around">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
        </div>
    </Card>
);


type FeedItem = (Post & { type: 'post' }) | (Broadcast & { type: 'broadcast' });


export const HomePage: React.FC = () => {
  const { user } = useAuth();
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatePostModalOpen, setCreatePostModalOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
        if (!user) return;

        const visiblePosts = user.role === Role.STUDENT
            ? MOCK_POSTS.filter(post => post.author.role === Role.TEACHER || post.author.role === Role.ADMIN)
            : MOCK_POSTS;

        const postsForFeed: FeedItem[] = visiblePosts.map(p => ({ ...p, type: 'post' }));
        const broadcastsForFeed: FeedItem[] = MOCK_BROADCASTS.map(b => ({ ...b, type: 'broadcast' }));
        const combinedFeed = [...postsForFeed, ...broadcastsForFeed];
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

        combinedFeed.sort((a, b) => {
            const aIsRecentBroadcast = a.type === 'broadcast' && new Date(a.timestamp) > twentyFourHoursAgo;
            const bIsRecentBroadcast = b.type === 'broadcast' && new Date(b.timestamp) > twentyFourHoursAgo;
            if (aIsRecentBroadcast && !bIsRecentBroadcast) return -1;
            if (!aIsRecentBroadcast && bIsRecentBroadcast) return 1;
            return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        });

        setFeedItems(combinedFeed);
        setIsLoading(false);
    }, 1000);
  }, [user]);

  const handleCreatePost = (content: string) => {
    if (!content.trim() || !user) return;
    const newPost: FeedItem = {
      id: `post-${Date.now()}`,
      author: user,
      content: content,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      type: 'post',
    };
    
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    let lastPinnedIndex = -1;
    feedItems.forEach((item, index) => {
        if (item.type === 'broadcast' && new Date(item.timestamp) > twentyFourHoursAgo) {
            lastPinnedIndex = index;
        }
    });

    const newFeedItems = [...feedItems];
    newFeedItems.splice(lastPinnedIndex + 1, 0, newPost);
    
    setFeedItems(newFeedItems);
    setCreatePostModalOpen(false);
  };

  if (!user) return null;
  
  const isStudent = user.role === Role.STUDENT;
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  return (
    <>
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8">
            {!isStudent && (
                <CreatePostCard user={user} onComposeClick={() => setCreatePostModalOpen(true)} />
            )}

            {isLoading ? (
                <>
                    <PostSkeleton />
                    <PostSkeleton />
                </>
            ) : (
                feedItems.map((item) => {
                    if (item.type === 'post') {
                        return <FeedPostCard key={item.id} post={item} />;
                    } else {
                        const isPinned = new Date(item.timestamp) > twentyFourHoursAgo;
                        return <BroadcastCard key={item.id} broadcast={item} isPinned={isPinned} />;
                    }
                })
            )}
      </div>
      <aside className="hidden lg:block lg:col-span-4">
        <div className="sticky top-8 space-y-6">
            <SuggestedUsers />
            <TrendingTopics />
        </div>
      </aside>
    </div>
    <CreatePostModal 
        isOpen={isCreatePostModalOpen}
        onClose={() => setCreatePostModalOpen(false)}
        user={user}
        onPost={handleCreatePost}
    />
    </>
  );
};