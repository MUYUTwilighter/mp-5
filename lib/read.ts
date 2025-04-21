"use server"

import CLIENT from "@/lib/dbClient";

export default async function read(alias: string) {
    let result: string | null = null;
    await CLIENT.db("main").collection("urls").findOne({alias}, {projection: {_id: 0, url: 1}}).then(data => result = data?.url).catch(reason => {
        console.log(reason);
    });
    return result;
}