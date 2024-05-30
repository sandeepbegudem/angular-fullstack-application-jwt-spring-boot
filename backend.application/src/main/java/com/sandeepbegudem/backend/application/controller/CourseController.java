package com.sandeepbegudem.backend.application.controller;


import com.sandeepbegudem.backend.application.dto.CourseDTO;
import com.sandeepbegudem.backend.application.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/courses")
@CrossOrigin("*")
public class CourseController {

    @Autowired
    private CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('Admin')")
    public Page<CourseDTO> searchCourses(@RequestParam(name = "keyword", defaultValue = "") String keyword,
                                         @RequestParam(name = "page", defaultValue = "0") int page,
                                         @RequestParam(name = "size", defaultValue = "5") int size) {
        return courseService.findCourseByCourseName(keyword, page, size);
    }

    @DeleteMapping("/{courseId}")
    @PreAuthorize("hasAuthority('Admin')")
    public void deleteCourse(@PathVariable Long courseId) {
        courseService.removeCourse(courseId);
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('Admin', 'Instructor')")
    public CourseDTO saveCourse(@RequestBody CourseDTO courseDTO) {
       return courseService.insertCourse(courseDTO);
    }

    @PutMapping("/{courseId}")
    @PreAuthorize("hasAnyAuthority('Admin', 'Instructor')")
    public CourseDTO updateCourse(@RequestBody CourseDTO courseDTO, @PathVariable Long courseId) {
        courseDTO.setCourseId(courseId);
        return courseService.updateCourse(courseDTO);
    }

    @PostMapping("/{courseId}/enroll/students/{studentId}")
    @PreAuthorize("hasAuthority('Student')")
    public void enrollStudentInCourse(@PathVariable Long courseId, @PathVariable Long studentId) {
        courseService.assignStudentToCourse(courseId, studentId);
    }

}
