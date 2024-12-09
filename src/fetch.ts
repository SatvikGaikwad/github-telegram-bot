import axios from "axios";

const headers = {
    Authorization: `token ${process.env.GITHUB_TOKEN}`
};

const fetch = async (repo: string, type: string): Promise<string> => {
    try {
        const response = await axios.get(`https://api.github.com/repos/${repo}`, { headers });
        const data = response.data;

        if (type === "Stars" && data.stargazers_count !== undefined) {
            return `Repo: ${repo} has ${data.stargazers_count} stars`;
        } else if (type === "Forks" && data.forks_count !== undefined) {
            return `Repo: ${repo} has ${data.forks_count} forks`;
        } else {
            return "Enter a valid repository type (Stars or Forks)";
        }
    } catch (error) {
        return `Error: ${error.response?.status} - ${error.response?.data.message || "Unknown error"}`;
    }
};

export default fetch;
