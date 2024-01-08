package com.pivotpirates.nutrastride.Models.dto;

public class RegisterFormDTO extends LoginFormDTO {

    private String verifyPassword;

    public String getVerifyPassword() {
        return verifyPassword;
    }

    public void setVerifyPassword(String verifyPassword) {
        this.verifyPassword = verifyPassword;
        System.out.println("VerifyPassword set to: " + verifyPassword);
    }

}
