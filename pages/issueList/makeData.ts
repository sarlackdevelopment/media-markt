// export type TIssue = {
//     title: string,
//     url: string
// }
//
// const range = (len: number) => {
//     const arr = [];
//     for (let i = 0; i < len; i++) {
//         arr.push(i);
//     }
//     return arr;
// };
//
// const newIssue = (): TIssue => ({
//     title: 'issue',
//     url: 'url'
// });

// export function makeData(...lens: number[]) {
//     const makeDataLevel = (depth = 0): TIssue[] => {
//         const len = lens[depth]!;
//         return range(len).map((d): TIssue => ({
//             ...newIssue()
//             //subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
//         }));
//     };
//
//     return makeDataLevel();
// }
