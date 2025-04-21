"use server"

import CLIENT from "@/lib/dbClient";
import read from "@/lib/read";

export default async function create(url: string, alias: string) {
    let result = true;
    await read(alias).then(data => {
        if (data) {
            result = false;
        } else {
            CLIENT.db("main").collection("urls").insertOne({url: url, alias: alias}).catch(reason => {
                result = false;
                console.log(reason);
            });
        }
    });
    return result;
}