package com.sandeepbegudem.backend.application.controller;

import com.sandeepbegudem.backend.application.dto.CourseDTO;
import com.sandeepbegudem.backend.application.dto.StudentDTO;
import com.sandeepbegudem.backend.application.entity.User;
import com.sandeepbegudem.backend.application.service.CourseService;
import com.sandeepbegudem.backend.application.service.StudentService;
import com.sandeepbegudem.backend.application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("/api/v1/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private UserService userService;

    @Autowired
    private CourseService courseService;


    public StudentController(StudentService studentService, UserService userService, CourseService courseService) {
        this.studentService = studentService;
        this.userService = userService;
        this.courseService = courseService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('Admin')")
    public Page<StudentDTO> searchStudents(@RequestParam(name = "keyword", defaultValue = "") String keyword,
                                           @RequestParam(name = "currentPage", defaultValue = "0") int currentPage,
                                           @RequestParam(name = "pageSize", defaultValue = "5") int pageSize) {
        return studentService.fetchStudentByName(keyword, currentPage, pageSize);
    }

    @DeleteMapping("/{studentId}")
    @PreAuthorize("hasAuthority('Admin')")
    public void deleteStudentById(@PathVariable Long studentId) {
        studentService.removeStudent(studentId);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('Admin')")
    public StudentDTO insertStudent(@RequestBody StudentDTO studentDTO) {
       User user = userService.loadUserByEmail(studentDTO.getUserDTO().getEmail());
        if(user != null) throw new RuntimeException("Email Already Exist");
        return studentService.createStudent(studentDTO);
    }

    @PutMapping("/{studentId}")
    @PreAuthorize("hasAuthority('Student')")
    public StudentDTO updateStudent(@PathVariable Long studentId, @RequestBody StudentDTO studentDTO) {
        studentDTO.setStudentId(studentId);
        return studentService.updateStudent(studentDTO);
    }

    @GetMapping("/{studentId}/courses")
    @PreAuthorize("hasAuthority('Student')")
    public Page<CourseDTO> coursesByStudentId(@PathVariable long studentId,
                                              @RequestParam(name = "currentPage", defaultValue = "0") int currentPage,
                                              @RequestParam(name = "pageSize", defaultValue = "5") int pageSize) {
        return courseService.fetchCoursesForStudent(studentId, currentPage, pageSize);
    }

    @GetMapping("/{studentId}/other-courses")
    @PreAuthorize("hasAuthority('Student')")
    public Page<CourseDTO> nonSubscribedCoursesByStudentId(@PathVariable long studentId,
                                                           @RequestParam(name = "page", defaultValue = "0") int page,
                                                           @RequestParam(name = "size", defaultValue = "5") int size) {
        return courseService.fetchNonEnrolledInCoursesForStudent(studentId, page,size);
    }

    @GetMapping("/find")
    @PreAuthorize("hasAuthority('Student')")
    public StudentDTO fetchStudentByEmail(@RequestParam(name = "email", defaultValue = "") String email) {
        return studentService.fetchStudentByEmail(email);
    }
}
