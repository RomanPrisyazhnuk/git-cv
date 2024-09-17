import { getUserRepositories } from "@/entities/repository/actions";
import { Repository } from "@/entities/repository/types";
import { getUserData } from "@/entities/user/actions";
import { User } from "@/entities/user/types";

export default async function CvPage({
  params,
}: {
  params: { username: string };
}) {
  // Getting user data
  const accountData: User | null = await getUserData(params.username);
  let repositoriesData: Repository[] = [];
  if (accountData) {
    repositoriesData = await getUserRepositories(params.username);
  } else {
    return (
      <div className="flex items-center justify-center text-2xl font-bold text-center w-full h-screen">
        {`No data in Github for username: ${params.username}`}
      </div>
    );
  }
  // Sort by latest updated repositories
  const sortedRepositories = repositoriesData
    .sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
    )
    .slice(0, 10);

  // Count of languages ​​used and their percentage
  const languageUsage: { [key: string]: number } = {};
  repositoriesData.forEach((repo) => {
    if (repo.language) {
      if (languageUsage[repo.language]) {
        languageUsage[repo.language]++;
      } else {
        languageUsage[repo.language] = 1;
      }
    }
  });

  const totalRepos = repositoriesData.length;
  const languagePercentages = Object.keys(languageUsage).map((lang) => ({
    language: lang,
    percentage: ((languageUsage[lang] / totalRepos) * 100).toFixed(2),
  }));

  const blockClases =
    "pb-8 mb-4 flex w-full flex-col lg:flex-row gap-4 border-b-1 border-white";
  const blockTitleClasses = "text-2xl font-bold lg:min-w-[230px]";
  return (
    <div className="container mx-auto p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl lg:text-4xl font-bold">
          {accountData?.name
            ? accountData.name.toUpperCase()
            : accountData.login.toUpperCase()}
        </h1>
        <p className="text-xl text-gray-600">Passionate GitHub User</p>
      </div>

      <section className={blockClases}>
        <h2 className={blockTitleClasses}>GitHub Profile</h2>
        <p>
          {`On GitHub since ${new Date(accountData.created_at).getFullYear()}, ${accountData.login} is a developer with `}
          <strong>{accountData.public_repos}</strong> public repositories and{" "}
          <strong>{accountData.followers}</strong> followers.{" "}
          <a href={accountData.html_url} className="text-blue-500">
            GitHub
          </a>
        </p>
      </section>

      <section className={blockClases}>
        <h2 className={blockTitleClasses}>Languages</h2>
        <ul>
          {languagePercentages.map((lang) => (
            <li key={lang.language}>
              {lang.language}: {lang.percentage}%
            </li>
          ))}
        </ul>
      </section>

      <section className={blockClases}>
        <h2 className={blockTitleClasses}>Repositories</h2>
        <ul>
          {sortedRepositories.map((repo) => (
            <li key={repo.name} className="mb-4">
              <a href={repo.html_url} className="text-blue-500">
                {repo.name}
              </a>
              <p>
                {" "}
                {new Date(repo.created_at).getFullYear()}-
                {new Date(repo.updated_at).getFullYear()} ({repo.language})
              </p>
              <p>{repo.description || "No description"}</p>
              <span>
                ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
