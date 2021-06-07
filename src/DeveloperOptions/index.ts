export = class implements BdPlugin {
  public start(): void {
    this.setDeveloperOptions(true);

    // TODO: A better way to focus on new settings
    const scroll = document.querySelector(".sidebarRegionScroller-3MXcoP");
    if (scroll) scroll.scrollTop = scroll.scrollHeight;
  }

  public stop(): void {
    this.setDeveloperOptions(false);
  }

  private setDeveloperOptions(value: boolean): void {
    Object.defineProperty(
      BdApi.findModuleByProps("isDeveloper"),
      "isDeveloper",
      { get: () => value, set: (_) => _, configurable: true }
    );

    // TODO: A better way to refresh the settings page
    if (document.querySelector("[aria-label=USER_SETTINGS]"))
      document
        .querySelector<HTMLButtonElement>(".button-14-BFJ:last-child")
        ?.click();
  }
};
