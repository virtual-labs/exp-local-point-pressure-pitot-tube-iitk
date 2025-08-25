function generateTubesHeight(flowRate) {

    if (flowRate <= 4.15)
        calculateHnPE_low(flowRate);
    else
        calculateHnPE_high(flowRate);

    let velMin = [0.4209, 0.4413, 0.4454, 0.4459, 0.4458, 0.4458, 0.4458, 0.4459, 0.4454, 0.4413, 0.4209];
    let velMax = [1.362, 1.405, 1.408, 1.408, 1.407, 1.407, 1.407, 1.408, 1.408, 1.405, 1.362];
    let vel = new Array(11);
    let err = new Array(11);
    let hDiff = new Array(11);

    for (let i = 0; i < 11; i++) {
        vel[i] = velMin[i] + (flowRate * 0.0001 - 0.000245) * (velMax[i] - velMin[i]) / 0.000555;
        err[i] = percentageError[i] * vel[i] / 100;
        vel[i] = vel[i] - err[i];
        hDiff[i] = Math.pow(vel[i], 2) * 100 / 19.62;
        staticH[i] = spd_height[i] - hDiff[i];
    }
    // System.out.println(String.format(Locale.US, "error = %.6f,   Velocity r=-10 is %.5f", percentageError[0], vel[0]) );
}


function calculateHnPE_low(flowRate) {

    spd_height[0] = 3.4831461 * flowRate + 48.266292;
    percentageError[0] = 0.297425 * Math.pow(flowRate, 5) - 3.99143 * Math.pow(flowRate, 4) + 6.16347 * Math.pow(flowRate, 3) + 127.659 * Math.pow(flowRate, 2) - 679.181 * flowRate + 1003.41;

    spd_height[1] = 3.4831461 * flowRate + 48.366292;
    percentageError[1] = 0.770016 * Math.pow(flowRate, 5) - 9.50352 * Math.pow(flowRate, 4) + 21.1918 * Math.pow(flowRate, 3) + 167.355 * Math.pow(flowRate, 2) - 914.106 * flowRate + 1270.73;

    spd_height[2] = 3.4831461 * flowRate + 48.466292;
    percentageError[2] = 1.26049 * Math.pow(flowRate, 5) - 15.5986 * Math.pow(flowRate, 4) + 34.6234 * Math.pow(flowRate, 3) + 275.418 * Math.pow(flowRate, 2) - 1485.71 * flowRate + 2024.09;

    spd_height[3] = 3.4831461 * flowRate + 48.566292;
    percentageError[3] = 1.02128 * Math.pow(flowRate, 5) - 12.7233 * Math.pow(flowRate, 4) + 28.6429 * Math.pow(flowRate, 3) + 225.112 * Math.pow(flowRate, 2) - 1225.66 * flowRate + 1679.56;

    spd_height[4] = 3.4269663 * flowRate + 48.903933;
    percentageError[4] = -0.47262 * Math.pow(flowRate, 4) + 4.0948 * Math.pow(flowRate, 3) + 1.75069 * Math.pow(flowRate, 2) - 90.5471 * flowRate + 193.457;

    spd_height[5] = 3.4269663 * flowRate + 48.903933;
    percentageError[5] = -0.0218502 * Math.pow(flowRate, 3) + 2.59074 * Math.pow(flowRate, 2) - 22.7186 * flowRate + 51.716;

    spd_height[6] = 3.3146067 * flowRate + 49.279213;
    percentageError[6] = -0.315099 * Math.pow(flowRate, 4) + 2.67941 * Math.pow(flowRate, 3) + 1.30458 * Math.pow(flowRate, 2) - 59.0526 * flowRate + 126.559;

    spd_height[7] = 3.3146067 * flowRate + 49.179213;
    percentageError[7] = 0.638338 * Math.pow(flowRate, 5) - 7.77603 * Math.pow(flowRate, 4) + 16.694 * Math.pow(flowRate, 3) + 136.704 * Math.pow(flowRate, 2) - 722.742 * flowRate + 975.134;

    spd_height[8] = 3.3707865 * flowRate + 48.941573;
    percentageError[8] = 0.71091 * Math.pow(flowRate, 5) - 8.75471 * Math.pow(flowRate, 4) + 19.2392 * Math.pow(flowRate, 3) + 154.301 * Math.pow(flowRate, 2) - 827.645 * flowRate + 1127.08;

    spd_height[9] = 3.3707865 * flowRate + 48.841573;
    percentageError[9] = 0.71072 * Math.pow(flowRate, 5) - 9.03216 * Math.pow(flowRate, 4) + 21.2867 * Math.pow(flowRate, 3) + 160.339 * Math.pow(flowRate, 2) - 903.898 * flowRate + 1276.78;

    spd_height[10] = 3.0898876 * flowRate + 49.429775;
    percentageError[10] = 0.231872 * Math.pow(flowRate, 5) - 3.81021 * Math.pow(flowRate, 4) + 13.1503 * Math.pow(flowRate, 3) + 71.1575 * Math.pow(flowRate, 2) - 523.637 * flowRate + 857.717;
}

function calculateHnPE_high(flowRate) {

    spd_height[0] = 12.4700217 * flowRate + 10.97075819;
    percentageError[0] = -1.47059 * flowRate + 12.1024;

    spd_height[1] = 12.3439713 * flowRate + 11.59386743;
    percentageError[1] = -0.73529 * flowRate + 6.051471;

    spd_height[2] = 12.3439713 * flowRate + 11.69386743;
    percentageError[2] = -0.21008 * flowRate + 2.121849;

    spd_height[3] = 12.6380889 * flowRate + 10.5732792;
    percentageError[3] = -0.02941 * flowRate + 0.622059;

    spd_height[4] = 12.6782174 * flowRate + 10.51124068;
    percentageError[4] = -0.15546 * flowRate + 1.395168;

    spd_height[5] = 12.7202342 * flowRate + 10.33687093;
    percentageError[5] = -0.35714 * flowRate + 2.982143;

    spd_height[6] = 12.8004910 * flowRate + 9.912793882;
    percentageError[6] = -0.48739 * flowRate + 4.042689;

    spd_height[7] = 12.9265414 * flowRate + 9.289684638;
    percentageError[7] = -0.44538 * flowRate + 4.408319;

    spd_height[8] = 12.9704466 * flowRate + 9.102983665;
    percentageError[8] = -0.48319 * flowRate + 5.155252;

    spd_height[9] = 12.8443962 * flowRate + 9.526092909;
    percentageError[9] = -0.73529 * flowRate + 7.301471;

    spd_height[10] = 12.9189878 * flowRate + 8.639009536;
    percentageError[10] = -1.02941 * flowRate + 9.722059;

}

function switchExpMode() {
    if (!vel_profile) {
        vel_profile = true;
    } else {
        vel_profile = false;
    }
    // setObservationData(0);
    // obsCount = dataSNo;
    // if(obsCount == 10){
    //     saveButton.setText("Proceed");
    //     saveButton.setTag("2");
    // }else{
    //     saveButton.setText("Save");
    //     saveButton.setTag("1");
    // }
    // observationCount.setText(String.format("%s of 10", obsCount));
}

function setTubesLevel() {
    static_press_bar.seek(Math.round(height[0]));
    dynamic_press_bar.seek(Math.round(height[1]));
}

function setObservationData(r) {
    height[0] = staticH[(r + 10) / 2];
    height[1] = spd_height[(r + 10) / 2];
    // if(vel_profile){
    //     flowRateTV.setText(String.format(Locale.US, "Q = %.2fE-01 L/s", flowRate));
    //     pinHeightTV.setText(String.valueOf(pin_height));
    //     staticHTV.setText(String.format(Locale.US, "%.1f", height[0]));
    //     dynamicHTV.setText(String.format(Locale.US, "%.1f", height[1]));
    // }
    // else {
    //     flowRateText.setText(String.format(Locale.US, "%.2fE-01", flowRate));
    //     static_pressText.setText(String.format(Locale.US, "%.1f", height[0]));
    //     dynamic_pressText.setText(String.format(Locale.US, "%.1f", height[1]));
    // }
}