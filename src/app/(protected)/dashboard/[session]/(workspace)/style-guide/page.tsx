import { ThemeContent } from "@/components/style/theme";
import { TabsContent } from "@/components/ui/tabs";
import { MoodBoardImagesQuery, StyleGuideQuery } from "@/convex/query.config";
import { MoodBoardImage } from "@/hooks/use-styles";
import { StyleGuide } from "@/redux/api/style-guide";
import { Palette } from "lucide-react";
import React from "react";
import { mockStyleGuide } from "./mockData";
import StyleGuideTypography from "@/components/style/typography";
import MoodBoard from "@/components/style/mood-board";

type Props = {
  searchParams: Promise<{
    project: string;
  }>;
};

const Page = async ({ searchParams }: Props) => {
  const projectId = (await searchParams).project;
  const existngStyleGuide = await StyleGuideQuery(projectId);
  console.log(existngStyleGuide);

  const guide = existngStyleGuide.styleGuide
    ?._valueJSON as unknown as StyleGuide;
  const colorGuide = guide?.colorSections || mockStyleGuide.colorSections;
  const typographyGuide =
    guide?.typographySections || mockStyleGuide.typographySections;
  const existingMoodBoardImages = await MoodBoardImagesQuery(projectId);
  const guideImages = existingMoodBoardImages?.images
    ._valueJSON as unknown as MoodBoardImage[];
  console.log("guidedImages", existingMoodBoardImages?.images._valueJSON);

  return (
    <div>
      <TabsContent value="colours" className="space-y-8">
        {!colorGuide.length ? (
          <div className="space-y-8">
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-muted flex items-center justify-center">
                <Palette className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                No colors generated yet
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                Upload images to your mood board and generate an AI-powered
                style guide with colors and typography.
              </p>
            </div>
          </div>
        ) : (
          <ThemeContent colorGuide={colorGuide} />
        )}
      </TabsContent>
      <TabsContent value="typography">
        <StyleGuideTypography
          typographyGuide={typographyGuide}
        ></StyleGuideTypography>
      </TabsContent>
      <TabsContent value="moodboard">
        <MoodBoard guideImages={guideImages}></MoodBoard>
      </TabsContent>
    </div>
  );
};

export default Page;
