export function finderForRightSide(whereWeAre: any, schema: any) {
  let ans;
  if (whereWeAre.module) {
    ans = schema[whereWeAre.module][whereWeAre.source][whereWeAre.channel];
  }
  if (whereWeAre.channel === "WhatsApp") {
    ans = ans[whereWeAre.subchannel][whereWeAre.submodule];
    return ans;
  } else {
    return ans[whereWeAre.submodule];
  }
}

// const whereWeAre={module:'Logger',source:"Debt Collection",channel:'Whatsapp',subchannel:'oneWay',submodule:'Campaign',reportOrTranscript:"transcript"};
