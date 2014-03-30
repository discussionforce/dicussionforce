/**
 * @author Masafumi OKAMOTO <masafumi.okamoto@cct-inc.co.jp>
 * 
 * Reference
 * "How to use Angular.Js with Visualforce" by Mohit Shrivastav and Harshit Pandey
 *  https://github.com/mailtoharshit/Angular/blob/master/AngularJSDemoController.cls
**/

public with sharing class DiscussionForceController{ 
    
    public String CaseList{get;set;}


    public class Casewrap {
        //Static Variables 
        public string id;
        public string subject;
        public string status;
        public string type;
        public string priority;
        
        //Wrapper  Class Controller
        Casewrap() {
            subject = '';
        }
        
    }    

         //Method to bring the list of Account and Serialize Wrapper Object as JSON
    public  static String getlstCase() {
        List < Casewrap > lstwrap = new List < Casewrap > ();
        List < Case > lstacc = [SELECT CaseNumber, Subject, Status, Type, Priority
                                   FROM Case 
                                   ORDER BY CaseNumber DESC
                                   limit 100
                                  ];
        for (Case a: lstacc) {
            Casewrap awrap = new Casewrap();
            awrap.id = a.casenumber;
            awrap.subject = a.subject;
            awrap.status = a.status;
            awrap.type = a.type;
            awrap.priority = a.priority;
 
            lstwrap.add(awrap);
        }
        return JSON.serialize(lstwrap);
     }
    
}