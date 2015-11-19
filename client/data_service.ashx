<%@ WebHandler Language="C#" Class="data_service" %>

using System;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Linq;
using System.IO;

public class data_service : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        
        context.Response.ContentType = "text/json";
        var queryValue = context.Request.QueryString["term"];
        string dataFilePath = context.Server.MapPath("~/data/labor_codes.json");
        LaborCodes lc = JsonConvert.DeserializeObject<LaborCodes>(File.ReadAllText(dataFilePath));
        if (queryValue == null) {
          queryValue = "";
        }
          
        var filteredCodes =
          from o in lc.Codes
          where o.Name.Contains(queryValue)
          select o;
        context.Response.Write(JsonConvert.SerializeObject(filteredCodes));
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}

public class LaborCode {
  [JsonProperty("name")]
  public string Name { get; set; }
  [JsonProperty("value")]
  public string Value { get; set; }
}

public class LaborCodes {
  [JsonProperty("laborCodes")]
  public List<LaborCode> Codes {get; set;}
}