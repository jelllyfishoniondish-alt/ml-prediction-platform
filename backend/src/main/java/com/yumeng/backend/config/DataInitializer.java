package com.yumeng.backend.config;

import com.yumeng.backend.model.MLModel;
import com.yumeng.backend.model.ProjectStatus;
import com.yumeng.backend.repository.MLModelRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {
    @Bean
CommandLineRunner initDatabase(MLModelRepository repository) {
    return args -> {
        if (repository.count() == 0) {
            // 1. completed projects
            repository.save(new MLModel(null, "Box Office Forecast", "Machine Learning", 
                "Python, NLP, BERT", ProjectStatus.COMPLETED, 
                "Undergraduate Thesis: Analyzing Genre Film Reviews and Predicting Box Office Performance Using NLP Technology.", 
                "R² = 0.868"));

            repository.save(new MLModel(null, "Spider Solitaire", "Software Dev", 
                "Python, Pygame", ProjectStatus.COMPLETED, 
                "Built a Spider Solitaire game engine in Python, focusing on rule enforcement, state management, and algorithmic correctness.", 
                "Logic Verified"));

            repository.save(new MLModel(null, "Restaurant SQL Modeling", "Database Design", 
                "MySQL, Relational Algebra", ProjectStatus.COMPLETED, 
                "Design and optimize the database architecture for the restaurant management system.", "Schema Optimized"));

            repository.save(new MLModel(null, "Petri Net Concurrency Modeling", "Academic Research",
                "Python, Petri Net, Discrete Event Simulation", ProjectStatus.COMPLETED,
                "Built a Petri Net-based simulation framework to analyze concurrency, resource contention, and system state transitions.",
                "Simulation Phase"));

            repository.save(new MLModel(null, "Customer Credit Risk Segmentation", "Kaggle Competition",
                "Python, Pandas, Scikit-learn, K-Means, PCA", ProjectStatus.COMPLETED,
                "Built a full analytical pipeline including preprocessing, feature transformation, clustering optimization, and performance validation to identify actionable credit risk segments.",
                "Deployment Phase"));

            repository.save(new MLModel(null, "Behavior-Driven Academic Performance Prediction", "Machine Learning",
                "Python, Pandas, Scikit-learn, XGBoost, Stacking Ensemble", ProjectStatus.COMPLETED,
                "Engineered behavioral features and implemented ensemble learning models including XGBoost and stacking; optimized predictive performance using cross-validation and RMSE-based evaluation.",
                "Optimization Phase"));

            // 2. in progress projects
            repository.save(new MLModel(null, "Full-Stack Project Management Platform", "Full-Stack Dev", 
                "React, Spring Boot, Docker", ProjectStatus.IN_PROGRESS, 
                "A personal project currently under development to showcase full-stack development capabilities and engineering mindset.", "In Development"));

            repository.save(new MLModel(null, "Digital Twin Network Modeling", "Academic Research", 
                "FastAPI, Kafka, NetworkX", ProjectStatus.IN_PROGRESS, 
                "Developed a Digital Twin Network model for topology representation, traffic simulation, and optimization of network performance.", "Theoretical Phase"));

            System.out.println("All engineering projects have been synchronized to the database!");

            // 3. planned projects
            repository.save(new MLModel(null, "Distributed Task Orchestrator", "System Design Project",
                "Java, gRPC, Docker, Redis", ProjectStatus.PLANNED,
                "Designing a fault-tolerant distributed task scheduling system with leader election, job coordination, and scalable worker nodes.",
                "Architecture Phase"));

            repository.save(new MLModel(null, "Parallel Graph Processing Engine", "High Performance Computing",
                "C++, OpenMP, MPI", ProjectStatus.PLANNED,
                "Planning a parallel graph processing framework to optimize large-scale network traversal and computation performance.",
                "Performance Optimization Phase"));
        }

    };
}
}