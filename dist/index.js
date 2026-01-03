fetch('https://music.youtube.com/playlist?list=PLES_m9ni2NyR9BccfQRmpq5m3o0g_l0Dd&si=RNNNTTGPTENfztqN', {
    method: "GET"
})
    .then((res) => {
    res.json()
        .then((jsonRes) => {
        console.log(jsonRes);
    });
});
export {};
//# sourceMappingURL=index.js.map