import { pageMainContent, setMoreOptonChildContent } from "./List/index.vue"
import dataJson from "./base.json"

export enum PersonalInfoItemType {
    phone = "tel:",
    email = "mailto:",
    link = ""
}

export interface PersonalInfoItem {
    [ksy: string]: string | { val: number | string, type?: PersonalInfoItemType, bold?: boolean, target?: "_blank" | "_self" }
}



function dataJsonTransformPageMainContent(json: object, parent?: object, key?: string): pageMainContent {
    if (typeof json === "string") {
        return json
    }

    if (Array.isArray(json) && json.length === 2 && Array.isArray(json[0]) && (typeof json[1] === "object" && !Array.isArray(json[1]) && json[1].isConfigObj !== false)) {
        if (parent && key) {
            parent[key] = setMoreOptonChildContent(json[0], json[1]) as any;
        }
    }

    if (Array.isArray(json)) {
        // console.log(!json.forEach, json);

        json.forEach((value, itemKey) => {
            if (Array.isArray(value)) {
                let jsonItem = json[itemKey];
                if (jsonItem.length === 2 && (typeof jsonItem[1] === "object" && !Array.isArray(jsonItem[1]) && jsonItem[1].isConfigObj !== false)) {
                    json[itemKey] = setMoreOptonChildContent(jsonItem[0], jsonItem[1]);
                }
            }
        });
    }

    for (let key in json) {
        if (json[key] && typeof json[key] == 'object') {
            dataJsonTransformPageMainContent(json[key], json, key)
        }
    }
    return json as pageMainContent
}


interface RawToData {
    pageMainContent: pageMainContent,
    personalInfo: Array<PersonalInfoItem>,
    name: string,
    logo: {
        href?: string,
        width?: string,
        height?: string
    }
}

export function rawToData(dataJson): RawToData {
    let { pageMainContent: pageMainContentJsonData, personalInfo: personalInfoJsonData, name, logo } = dataJson
    console.log(dataJson,"logo",logo);

    const tempData = dataJsonTransformPageMainContent({ ...pageMainContentJsonData }, dataJson, "pageMainContent");
    // console.log(tempData, dataJson);
    return {
        pageMainContent: tempData,
        personalInfo: personalInfoJsonData,
        name,
        logo: {
            "href": logo?.href
        }
    }
}

export default dataJson as any;