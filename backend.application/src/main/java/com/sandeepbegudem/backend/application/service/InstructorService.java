package com.sandeepbegudem.backend.application.service;import com.sandeepbegudem.backend.application.dto.InstructorDTO;import com.sandeepbegudem.backend.application.entity.Instructor;import org.springframework.data.domain.Page;import java.util.List;public interface InstructorService {    Instructor loadInstructorById(Long instructorId);    Page<InstructorDTO> findInstructorsByName(String name, int currentPage, int pageSize);    InstructorDTO loadInstructorByEmail(String email);    InstructorDTO createInstructor(InstructorDTO instructorDTO);    InstructorDTO updateInstructor(InstructorDTO instructorDTO);    List<InstructorDTO> fetchInstructors();    void removeInstructor(Long instructorId);}