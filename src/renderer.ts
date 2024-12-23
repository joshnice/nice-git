import "./index.css";

const gitVersionButton = document.getElementById("git-version-button");
const gitVersionText = document.getElementById("git-version-text");

gitVersionButton.addEventListener("click", async () => {
	const res = await gitApi.getVersion();
	gitVersionText.innerHTML += res;
});
