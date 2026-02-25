package com.yumeng.backend.repository;

import com.yumeng.backend.model.MLModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MLModelRepository extends JpaRepository<MLModel, Long> {
    // heritage from JpaRepository, already have save(), findAll(), findById(), delete() functions
}