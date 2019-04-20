package com.kiryld.mypassword.web.web

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping

@Controller
class MyPasswordController {

    @RequestMapping("/")
    fun home() = "/index.html"

}