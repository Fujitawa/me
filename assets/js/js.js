document.addEventListener("DOMContentLoaded", () => {
  const openTab = (tabName) => {
    Array.from(document.getElementsByClassName("tab-content"))
      .forEach((tab) => (tab.style.display = "none"));
    (document.getElementById(tabName) || document.getElementsByClassName("tab-content")[0])
      .style.display = "block";
  };

  openTab("tab1");
});














































































