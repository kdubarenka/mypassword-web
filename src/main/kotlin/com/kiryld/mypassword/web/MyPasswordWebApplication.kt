package com.kiryld.mypassword.web

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.web.filter.CommonsRequestLoggingFilter

@Configuration
@EnableAutoConfiguration
@ComponentScan
class MyPasswordWebApplication {

    @Bean
    fun logFilter() = CommonsRequestLoggingFilter().apply {
        setIncludeQueryString(true)
        setIncludeHeaders(true)
    }

    companion object {

        @JvmStatic
        fun main(args: Array<String>) {
            SpringApplication.run(MyPasswordWebApplication::class.java, *args)
        }

    }

}
