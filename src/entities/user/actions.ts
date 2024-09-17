import { User } from "./types";

export const getUserData = async (username: string): Promise<User | null> => {
  try {
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`,
    );
    if (!userResponse.ok) {
      throw new Error("User not found");
    }
    const userData: User = await userResponse.json();

    console.log(`User: ${userData.login}`);
    console.log(`Profile: ${userData.html_url}`);
    console.log(`Followers: ${userData.followers}`);
    console.log(`Following: ${userData.following}`);
    console.log(`Public Repositories: ${userData.public_repos}`);

    return userData;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
