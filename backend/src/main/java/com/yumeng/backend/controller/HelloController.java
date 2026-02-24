package com.yumeng.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
public class HelloController {

    @GetMapping("/api/hello")
    public Map<String, String> sayHello() {
        HashMap<String, String> results = new HashMap<>();
        results.put("message", "你好! 机器学习平台后端已就绪");
        results.put("status", "Success");
        return results;
    }
}