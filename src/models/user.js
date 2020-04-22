import Repo from "./repo";

class User {
  constructor(
    fname,
    lname,
    email,
    username,
    password,
    bio,
    resume,
    picture,
    linkedInLink,
    githubURL,
    themeChoice
  ) {
    this.userId = null;
    this.firstName = fname;
    this.lastName = lname;
    this.email = email;
    this.userName = username;
    this.password = password;
    this.bio = bio;
    this.resume = resume;
    this.picture = picture;
    this.linkedInLink = linkedInLink;
    this.githubURL = githubURL;
    this.themeChoice = themeChoice;
  }

  setUserID(userID) {
    this.userId = userID;
  }
}

export default User;
