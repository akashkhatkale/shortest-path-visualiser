

export default async function demo(refs) {
    // for (let i = 0; i < refs.length; i++) {
    //     for (let j = 0; j < refs[i].length; j++) {
    //         refs[i][j].current.onChangeColor();
    //         await sleep(100);
    //     }
    // }

    var visited = []
    var ij = [[7, 20]];
    var opacity = 100
    for (let index = 0; index < 1; index++) {
        if (index == 0) {
            var i = ij[0][0]
            var j = ij[0][1]
            for (let jindex = 0; jindex < 5; jindex++) {
                var r = refs[i][j].current
                ij.push([i, j])
                r.onChangeColor(opacity);
                visited.push(r.value)
                if (jindex == 0) {
                    i -= 1;
                } else if (jindex == 1) {
                    i += 1;
                    j += 1;
                } else if (jindex == 2) {
                    j -= 1;
                    i += 1;
                } else if (jindex == 3) {
                    i -= 1;
                    j -= 1;
                } else {
                    i -= 1;
                    j -= 1;
                }
                opacity -= 1
                await sleep(100)
            }
            ij.reverse()
            ij.pop()
            ij.reverse()
        }

        console.log(ij)

        for (let index = 0; index < ij.length; index++) {
            console.log("index : " + ij[index])
            var i = ij[index][0]
            var j = ij[index][1]
            for (let jindex = 0; jindex < 5; jindex++) {
                var r = refs[i][j].current
                ij.push([i, j])
                r.onChangeColor(opacity);
                visited.push(r.value)
                if (jindex == 0) {
                    i -= 1;
                } else if (jindex == 1) {
                    i += 1;
                    j += 1;
                } else if (jindex == 2) {
                    j -= 1;
                    i += 1;
                } else if (jindex == 3) {
                    i -= 1;
                    j -= 1;
                } else {
                    i -= 1;
                    j -= 1;
                }
                opacity -= 1
                await sleep(1)

            }
        }
    }

};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}