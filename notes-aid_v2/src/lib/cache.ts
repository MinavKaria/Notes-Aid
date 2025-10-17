import redis from '@/lib/redis';

export interface CacheOptions {
  ttl?: number; // Time to live in seconds
  prefix?: string;
}

export class RedisCache {
  private static instance: RedisCache;
  
  static getInstance(): RedisCache {
    if (!RedisCache.instance) {
      RedisCache.instance = new RedisCache();
    }
    return RedisCache.instance;
  }

  /**
   * Get data from Redis cache
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      if (!redis) {
        console.warn('Redis not available');
        return null;
      }
      
      const cached = await redis.get(key);
      if (cached) {
        console.log('Cache hit for:', key);
        return JSON.parse(cached) as T;
      }
      return null;
    } catch (error) {
      console.error('Redis get error:', error);
      return null;
    }
  }

  /**
   * Set data in Redis cache
   */
  async set(key: string, data: unknown, options: CacheOptions = {}): Promise<void> {
    try {
      if (!redis) {
        console.warn('Redis not available');
        return;
      }

      const { ttl = 3600 } = options; // Default 1 hour
      await redis.set(key, JSON.stringify(data), 'EX', ttl);
      console.log('Cached data for:', key, `(TTL: ${ttl}s)`);
    } catch (error) {
      console.error('Redis set error:', error);
    }
  }

  /**
   * Delete one or more cache keys
   */
  async del(keys: string | string[]): Promise<void> {
    try {
      if (!redis) {
        console.warn('Redis not available');
        return;
      }

      const keysArray = Array.isArray(keys) ? keys : [keys];
      if (keysArray.length > 0) {
        await redis.del(...keysArray);
        console.log('Cache invalidated for:', keysArray.join(', '));
      }
    } catch (error) {
      console.error('Redis delete error:', error);
    }
  }

  /**
   * Delete keys matching a pattern
   */
  async delPattern(pattern: string): Promise<void> {
    try {
      if (!redis) {
        console.warn('Redis not available');
        return;
      }

      const keys = await redis.keys(pattern);
      if (keys.length > 0) {
        await redis.del(...keys);
        console.log('Cache invalidated for pattern:', pattern, `(${keys.length} keys)`);
      }
    } catch (error) {
      console.error('Redis pattern delete error:', error);
    }
  }

  /**
   * Check if Redis is available
   */
  isAvailable(): boolean {
    return redis !== null;
  }
}

// Export singleton instance
export const cache = RedisCache.getInstance();

// Cache key generators for consistent naming
export const CacheKeys = {
  curriculum: (year?: string, branch?: string) => 
    `curriculum:${year || 'all'}:${branch || 'all'}`,
  
  subject: (subject: string, module?: string) => 
    `subject:${subject}${module ? `:module:${module}` : ''}`,
  
  stats: (subject: string) => 
    `stats:${subject}`,
  
  quickLinks: (subject: string) => 
    `quick-links:${subject}`,
  
  leaderboard: (searchParams?: URLSearchParams) => {
    if (!searchParams) return 'leaderboard:default';
    
    // Create deterministic cache key from search parameters
    const params = new URLSearchParams();
    const relevantParams = [
      'admission_year', 'page', 'limit', 'sort_by', 'sort_order',
      'name', 'seat_number', 'min_cgpa', 'max_cgpa'
    ];
    
    relevantParams.forEach(param => {
      const value = searchParams.get(param);
      if (value) params.set(param, value);
    });
    
    // Sort parameters for consistent key generation
    params.sort();
    return `leaderboard:${params.toString()}`;
  },
};

// Common TTL values (in seconds)
export const CacheTTL = {
  SHORT: 300,    // 5 minutes
  MEDIUM: 1800,  // 30 minutes  
  LONG: 3600,    // 1 hour
  VERY_LONG: 86400, // 24 hours
};
