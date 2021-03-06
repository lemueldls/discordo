// eslint-disable-next-line import/no-unresolved
import type { BdApiModule } from "@bandagedbd/bdapi";
import type React from "react";
import type { DisplayNames } from "./modules";

type BdApiModuleType = typeof BdApiModule;

interface BdApiType extends BdApiModuleType {
  findModuleByDisplayName<P = unknown, C = unknown>(
    name: DisplayNames
  ): React.FunctionComponent<P> & C;
}

declare global {
  /**
   * `BdApi` is a globally available access usable in plugins by any of the following ways: `BdApi`, `window.BdApi`, `global.BdApi`.
   *
   * The following functions are available as a part of the `BdApi` object.
   */
  const BdApi: BdApiType;

  interface BdPlugin {
    /**
     * The name for the plugin to be displayed to the user in the plugins page and for internal settings to use.
     *
     * Note: This is no longer required if it is included in the meta.
     *
     * @returns {string} The name for the plugin.
     */
    getName?(): string;

    /**
     * The description of the plugin shown in the plugins page.
     *
     * Note: This is no longer required if it is included in the meta.
     *
     * @returns {string} The description of the plugin.
     */
    getDescription?(): string;

    /**
     * The version of the plugin displayed in the plugins page.
     *
     * Note: This is no longer required if it is included in the meta.
     *
     * @returns {string} The version of the plugin.
     */
    getVersion?(): string;

    /**
     * The author string for the plugin displayed in the plugins page.
     *
     * Note: This is no longer required if it is included in the meta.
     *
     * @returns {string} The author of the plugin.
     */
    getAuthor?(): string;

    /**
     * Called when the plugin is enabled or when it is loaded and was previously reloaded (such as discord start or reload).
     */
    start(): void;

    /**
     * Called when the plugin is disabled.
     */
    stop(): void;

    /**
     * Called when the user clicks on the settings button for the plugin. If this function is not implemented the button is not shown.
     *
     * Note: The button will be disabled if the plugin is disabled to avoid errors with not-started plugins.
     *
     * @returns {string|HTMLElement} Either a valid string containing the html for the panel or an actual element to be injected into the settings panel.
     */
    getSettingsPanel?(): string | HTMLElement;

    /**
     * Called when the plugin is loaded regardless of if it is enabled or disabled.
     */
    load?(): void;

    /**
     * Called on every mutation that occurs on the `document`. For more information on observers and mutations take a look at MDN's documentation.
     *
     * @param {MutationRecord} changes The mutation that occurred.
     *
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver}
     */
    observer?(changes: MutationRecord): void;

    /**
     * Called every time the user navigates such as changing channel, changing servers, changing to friends list, etc.
     */
    onSwitch?(): void;
  }
}
