package com.sandeepbegudem.backend.application.controller;

import com.sandeepbegudem.backend.application.dto.CourseDTO;
import com.sandeepbegudem.backend.application.dto.InstructorDTO;
import com.sandeepbegudem.backend.application.entity.User;
import com.sandeepbegudem.backend.application.service.CourseService;
import com.sandeepbegudem.backend.application.service.InstructorService;
import com.sandeepbegudem.backend.application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("/api/v1/instructors")
public class InstructorController {

    @Autowired
    private InstructorService instructorService;

    @Autowired
    private UserService userService;

    @Autowired
    private CourseService courseService;

    public InstructorController(InstructorService instructorService, UserService userService, CourseService courseService) {
        this.instructorService = instructorService;
        this.userService = userService;
        this.courseService = courseService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('Admin')")
    public Page<InstructorDTO> searchInstructors(@RequestParam(name = "keyword", defaultValue = "") String keyword,
                                                 @RequestParam(name = "currentPage", defaultValue = "0") int currentPage,
                                                 @RequestParam(name = "pageSize", defaultValue = "5") int pageSize) {
        return instructorService.findInstructorsByName(keyword,currentPage, pageSize);
    }


    @GetMapping("/all")
    @PreAuthorize("hasAuthority('Admin')")
    public List<InstructorDTO> findAllInstructors() {
        return instructorService.fetchInstructors();
    }

    @DeleteMapping("/{instructorId}")
    @PreAuthorize("hasAuthority('Admin')")
    public void deleteInstructor(@PathVariable Long instructorId) {
        instructorService.removeInstructor(instructorId);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('Admin')")
    public InstructorDTO insertInstructor(@RequestBody InstructorDTO instructorDTO) {
        User user = userService.loadUserByEmail(instructorDTO.getUserDTO().getEmail());
        if (user != null) throw new RuntimeException("Email Already Exist");
        return instructorService.createInstructor(instructorDTO);
    }

    @PutMapping("/{instructorId}")
    @PreAuthorize("hasAuthority('Instructor')")
    public InstructorDTO updateInstructor(@PathVariable Long instructorId ,@RequestBody InstructorDTO instructorDTO) {
        instructorDTO.setInstructorId(instructorId);
        return instructorService.updateInstructor(instructorDTO);
    }

    @GetMapping("/{instructorId}/courses")
    @PreAuthorize("hasAnyAuthority('Admin', 'Instructor')")
    public  Page<CourseDTO> coursesByInstructorId(@PathVariable Long instructorId,
                                                @RequestParam(name = "currentPage", defaultValue = "0") int currentPage,
                                                @RequestParam(name = "pageSize", defaultValue = "5") int pageSize) {
        return courseService.fetchCoursesForInstructor(instructorId, currentPage, pageSize);
    }

    @GetMapping("/find")
    @PreAuthorize("hasAuthority('Instructor')")
    public InstructorDTO fetchInstructorByEmail(@RequestParam (name = "email", defaultValue = "") String email) {
        return instructorService.loadInstructorByEmail(email);
    }
}
