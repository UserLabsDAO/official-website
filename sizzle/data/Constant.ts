export const redeemOpenTime = () => {
    let date = new Date('2023-05-26T00:00:00+08:00');
    const milliseconds = date.getTime();
    console.log(milliseconds);
    return milliseconds;
}

export const redeemOpenTimeLeft = () => {
    const left = redeemOpenTime() - new Date().getTime();
    if (left < 0) {
        return 0;
    }
    return left;

}

export const textindent = 30;

export const TEST_DATA_NUMBER = [41,9,7787];

export const CLAIM_MONEYS = [1.58,3.16,4.74,6.32,9.49,6.33];

export const C4_UPLEVEL = '83.9%';

export const MENUTOP_OFFSET = 120;

export const CONTENT_MARGIIN = 120;
