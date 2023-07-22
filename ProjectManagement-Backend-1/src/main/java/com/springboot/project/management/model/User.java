package com.springboot.project.management.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private long id;
	
	@Column(name="user_Fname")
	private String fName;
	
	@Column(name = "user_Lname")
	private String lNname;
	
	@Column(name="user_mail")
	private String emailId;
	
	@Column(name="user_password")
	private String password;

	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	public User(long id, String fName, String lNname, String emailId, String password) {
		super();
		this.id = id;
		this.fName = fName;
		this.lNname = lNname;
		this.emailId = emailId;
		this.password = password;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getfName() {
		return fName;
	}

	public void setfName(String fName) {
		this.fName = fName;
	}

	public String getlNname() {
		return lNname;
	}

	public void setlNname(String lNname) {
		this.lNname = lNname;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", fName=" + fName + ", lNname=" + lNname + ", emailId=" + emailId + ", password="
				+ password + "]";
	}

	
}
