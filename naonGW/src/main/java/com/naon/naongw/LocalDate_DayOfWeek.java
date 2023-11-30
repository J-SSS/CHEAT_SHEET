package com.naon.naongw;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.HashSet;
import java.util.Set;

/**
 * 특정 날짜가 속한 달의 n번째 주, m번째 요일 등을 구하는 함수
 */

public class LocalDate_DayOfWeek {
    public static void main(String[] args) {

        LocalDate currentDate = LocalDate.now(); // 현재 날짜를 가져옴
        LocalDate lastDayOfMonth = currentDate.with(TemporalAdjusters.lastDayOfMonth()); // 이번 달의 마지막 날짜를 가져옴
        boolean isLastDayOfMonth = currentDate.equals(lastDayOfMonth); // 현재 날짜가 이번 달의 마지막 날짜인지 여부 확인
        int year = currentDate.getYear();
        int month = currentDate.getMonthValue();

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd"); // "Sun", "Mon", 등의 축약된 요일 이름
        String todayDate = currentDate.format(dtf);
        String tomorrowDate = currentDate.plusDays(1).format(dtf);

        // 다음 근무일이 속한 월의 가장 첫 번 째 날짜를 구한다
        LocalDate firstDayOfMonth;
        if(isLastDayOfMonth){
            if(month == 12){
                year += 1;
                month = 1;
            } else {
                month += 1;
            }
            firstDayOfMonth = LocalDate.of(year, month, 1);
        } else {
            firstDayOfMonth = LocalDate.of(year, month, 1);
        }
        firstDayOfMonth = LocalDate.of(2024, 6, 1);
        // 단축 근무로 지정된 모든 규칙을 해당 월의 날짜 형식으로 변환하여 담는다

        String getRepeatRule = "00001"; //샘플
        String getWeekWrkDay = "11101"; //샘플
        String[] repeatRuleArr = getRepeatRule.split(""); //샘플
        String[] weekWrkDayArr = getWeekWrkDay.split(""); //샘플
        Set<String> resultCode = new HashSet<>();
        for(int i = 0 ; i < repeatRuleArr.length ; i++){
            if(repeatRuleArr[i].equals("1")){
                for(int j = 0 ; j < weekWrkDayArr.length ; j++){
                    if(weekWrkDayArr[j].equals("1")){
                        if(i <4){ // 반복규칙(주) : n번째 인경우 -> n번째 주의 e요일이 아니라 해당 월의 n번째 e요일을 의미한다
                            LocalDate firstMonday = firstDayOfMonth.with(TemporalAdjusters.dayOfWeekInMonth(i+1, DayOfWeek.of(j+1)));
                            resultCode.add(firstMonday.toString());
                        } else { // 반복규칙(주) : 마지막 주 인 경우
                            LocalDate firstMonday = firstDayOfMonth.with(TemporalAdjusters.lastInMonth(DayOfWeek.of(j+1)));
                            resultCode.add(firstMonday.toString());
                        }
                    }
                }
            }
        }

        System.out.println("설정목록 : " + resultCode.toString());
        System.out.println("내일날짜 : " + tomorrowDate);
        System.out.println("속해있는지 : " + resultCode.contains(tomorrowDate));

        // 설정한 단축근무 규칙에 내일날짜가 포함될 때
        if(resultCode.contains(tomorrowDate)){

        }
    }
}
