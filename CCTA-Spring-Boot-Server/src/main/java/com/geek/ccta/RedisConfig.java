package com.geek.ccta;

import lombok.Getter;
import org.springframework.context.annotation.Configuration;
import io.lettuce.core.RedisClient;
import io.lettuce.core.api.StatefulRedisConnection;
import io.lettuce.core.api.sync.RedisCommands;

@Configuration
public class RedisConfig {
    final private RedisClient redisClient = RedisClient.create("redis://10.0.0.6:6379/");//"redis://10.0.0.20:6379/3" - for my home use
    final private StatefulRedisConnection<String, String> connection = redisClient.connect();
    @Getter
    final private RedisCommands<String, String> syncCommands = connection.sync();
}
