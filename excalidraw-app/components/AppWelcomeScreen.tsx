import React from "react";
import { useI18n } from "../../src/i18n";
import { WelcomeScreen } from "../../src/packages/excalidraw/index";
import { POINTER_EVENTS } from "../../src/constants";

export const AppWelcomeScreen: React.FC<{
  setCollabDialogShown: (toggle: boolean) => any;
  isCollabEnabled: boolean;
}> = React.memo((props) => {
  const { t } = useI18n();
  let headingContent;

  return (
    <WelcomeScreen>
      <WelcomeScreen.Hints.MenuHint>
        {t("welcomeScreen.app.menuHint")}
      </WelcomeScreen.Hints.MenuHint>
      <WelcomeScreen.Hints.ToolbarHint />
      <WelcomeScreen.Hints.HelpHint />
      <WelcomeScreen.Center>
        <img src="TV_Logo_Red.png" alt="Trv_Logo" width={450} height={95} />
        <WelcomeScreen.Center.Heading>
          {<h4>Välkommen till Rita - Digital whiteboard på Trafikverket :-)</h4>}
          <h4>OBS! Detta är en testmiljö</h4>
          <h5>Powered by K8s</h5>
        </WelcomeScreen.Center.Heading>
        <WelcomeScreen.Center.Menu>
          <WelcomeScreen.Center.MenuItemLoadScene />
          <WelcomeScreen.Center.MenuItemHelp />
          {props.isCollabEnabled && (
            <WelcomeScreen.Center.MenuItemLiveCollaborationTrigger
              onSelect={() => props.setCollabDialogShown(true)}
            />
          )}
        </WelcomeScreen.Center.Menu>
      </WelcomeScreen.Center>
    </WelcomeScreen>
  );
});
