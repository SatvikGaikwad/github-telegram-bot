import axios from "axios";

const fetch = async (repo: string, type: string): Promise<string> => {
    if (type == "Stars") {
        const data = await axios.get(`https://api.github.com/repos/${repo}`);
        if (data.data.stargazers_count !== undefined) {
            const stars = data.data.stargazers_count;
            return `Repo: ${repo} has ${stars} stars`;
        } else {
            return "Enter a valid repository";
        }
    } else if (type == "Forks") {
        const data = await axios.get(`https://api.github.com/repos/${repo}`);
        if (data.data.forks_count !== undefined) {
            const stars = data.data.forks_count;
            return `Repo: ${repo} has ${stars} forks`;
        } else {
            return "Enter a valid repository";
        }
    } else {
        return "Enter a valid repository";
    }
};
export default fetch;
