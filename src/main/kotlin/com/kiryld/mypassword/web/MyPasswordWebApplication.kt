package com.kiryld.mypassword.web

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration

@Configuration
@EnableAutoConfiguration
@ComponentScan
class MyPasswordWebApplication {

    companion object {

        @JvmStatic
        fun main(args: Array<String>) {
            SpringApplication.run(MyPasswordWebApplication::class.java, *args)
        }

    }

}
