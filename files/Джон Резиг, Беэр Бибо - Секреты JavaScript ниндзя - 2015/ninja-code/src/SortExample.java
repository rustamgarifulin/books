import java.util.Arrays;
import java.util.Comparator;

public class SortExample {

  public static Integer[] values = { 213, 16, 2058, 54, 10, 1965, 57, 9 };

  public static void main(String... args) {
    Arrays.sort(values,new Comparator<Integer>(){
      public int compare(Integer value1, Integer value2) {
        return value2 - value1;
      }
    });
    for (Integer value : values) System.out.print(value + ", ");
  }

}
