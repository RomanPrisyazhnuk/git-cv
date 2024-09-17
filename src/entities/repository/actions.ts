import { Repository } from "./types";

export const getUserRepositories = async (
  username: string,
): Promise<Repository[]> => {
  try {
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos`,
    );
    if (!reposResponse.ok) {
      throw new Error("Failed to fetch repositories");
    }
    const repositories: Repository[] = await reposResponse.json();

    repositories.forEach((repo) => {
      console.log(repo);
    });
    return repositories;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
