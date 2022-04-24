describe("Routes: Index", ()=> {
    describe("GET /", () => {
        it("return the API status", done => {
            request.get('/')
            .expect(200)
            .end((err, res)=> {
                const expected = {status: "NTask API"};
                expect(res.body).to.eql(expected);
                done(err);
            });
        });
    });
});

// describe("Routes: Index", ()=> {
//     describe("GET /", () => {
//         it("return the API status", done => {
//             request('http://localhost:3000')
//             .get('/')
//             .expect(200)
//             .end((err, res)=> {
//                 const expected = {status: "NTask API"};
//                 expect(res.body).to.eql(expected);
//                 done(err);
//             });
//         });
//     });
// });
