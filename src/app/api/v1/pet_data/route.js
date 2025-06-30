import { NextResponse } from "next/server";
import { getSheetsService } from "../../../../hooks/functions/getSheetService";

const SPREADSHEET_ID = process.env.SHEET_ID; // <- paste your spreadsheet ID here

export async function GET() {
  const sheets = getSheetsService();
  // batch get by data filter
  try {
    const petList = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `Cubiods_Sheet!A:G`,
    });
    const petSkillList = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `Cubiods_Skill_Sheet!A:F`,
    });
    const petTraitList = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `Cubiods_Trait_Sheet!A:F`,
    });

    const pets = petList.data.values.slice(1).reverse();
    const skills = petSkillList.data.values.slice(1).reverse();
    const traits = petTraitList.data.values.slice(1).reverse();
    let petsJSON = [];
    let skillsJSON = [];
    let traitsJSON = [];

    if (skills.length > 0) {
      for (let i = 0; i < skills.length; i++) {
        const skill = skills[i];
        skillsJSON.push({
          id: skill[0],
          pet: skill[1],
          skill: skill[2],
          level: skill[3],
          description: skill[4],
          status: skill[5],
        });
      }
    }

    if (traits.length > 0) {
      for (let i = 0; i < traits.length; i++) {
        const trait = traits[i];
        traitsJSON.push({
          id: trait[0],
          pet: trait[1],
          trait: trait[2],
          level: trait[3],
          description: trait[4],
          status: trait[5],
        });
      }
    }

    if (pets.length > 0) {
      for (let i = 0; i < pets.length; i++) {
        const pet = pets[i];
        const petskills = skillsJSON.filter((e) => e.pet === pet[0]);
        const pettraits = traitsJSON.filter((e) => e.pet === pet[0]);
        petsJSON.push({
          id: pet[0],
          name: pet[1],
          title: pet[2],
          category: pet[3],
          image: pet[4],
          lore: pet[5],
          traits: pettraits,
          skills: petskills,
          status: pet[6],
        });
      }
    }

    return NextResponse.json(
      {
        pets: petsJSON,
      },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Google Sheets API error:", err);
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
