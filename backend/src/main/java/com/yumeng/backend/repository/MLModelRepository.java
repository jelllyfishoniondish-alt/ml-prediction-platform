package com.yumeng.backend.repository;

import com.yumeng.backend.model.MLModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MLModelRepository extends JpaRepository<MLModel, Long> {
    Optional<MLModel> findByName(String name);
}
