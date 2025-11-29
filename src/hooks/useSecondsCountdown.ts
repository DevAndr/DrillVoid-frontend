import { useCallback, useEffect, useMemo, useState } from "react";
import moment from "moment";
import _ from "lodash";

import { useTimer } from "./useTimer";

const formatTwoDigit = (digit: number): string =>
  digit < 10 ? `0${digit}` : `${digit}`;

interface IUseSecondsCountdownProps {
  endDate?: string | null;
  initialSecondsLeft?: number;
  formatLabelParams?: {
    days?: boolean;
    hours?: boolean;
    minutes?: boolean;
    seconds?: boolean;
  };
}

function useSecondsCountdown(props: IUseSecondsCountdownProps): {
  isInited: boolean;
  formattedLabel: string;
  secondsLeft: number;
} {
  const { endDate, initialSecondsLeft, formatLabelParams } = props;
  const [secondsLeft, setSecondsLeft] = useState(null);

  const init = useCallback(() => {
    if (!endDate && initialSecondsLeft === undefined) {
      return;
    }
    let secondsLeft: number;

    if (initialSecondsLeft !== undefined) {
      secondsLeft = initialSecondsLeft;
    } else {
      const now = moment();
      const endAtMoment = moment(endDate);
      const diff = endAtMoment.diff(now, "seconds");

      secondsLeft = diff > 0 ? diff : 0;
    }
    setSecondsLeft(secondsLeft);
  }, [endDate, initialSecondsLeft]);

  const handleUpdateSecondsLeft = useCallback(() => {
    setSecondsLeft((secondsLeft: number) => secondsLeft - 1);
  }, []);

  const { isTimerRunning, startTimer, stopTimer } = useTimer(
    handleUpdateSecondsLeft,
  );

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    const isNeedTimer = secondsLeft > 0;

    if (isNeedTimer && !isTimerRunning) {
      startTimer(1000);
    }
    if (!isNeedTimer && isTimerRunning) {
      stopTimer();
    }
  }, [secondsLeft, isTimerRunning, startTimer, stopTimer]);

  const formattedLabel = useMemo(() => {
    if (_.isEmpty(formatLabelParams)) {
      return `${secondsLeft}`;
    }
    const params: string[] = [];
    const duration = moment.duration(secondsLeft, "seconds");

    if (formatLabelParams.days) params.push(`${duration.days()}${"д"}`);
    if (formatLabelParams.hours)
      params.push(`${formatTwoDigit(duration.hours())}${"ч"}`);
    if (formatLabelParams.minutes)
      params.push(`${formatTwoDigit(duration.minutes())}${"м"}`);
    if (formatLabelParams.seconds)
      params.push(`${formatTwoDigit(duration.seconds())}${"c"}`);

    return params.join(" ");
  }, [formatLabelParams, secondsLeft]);

  return {
    isInited: secondsLeft !== null,
    formattedLabel,
    secondsLeft: secondsLeft || 0,
  };
}

export default useSecondsCountdown;
