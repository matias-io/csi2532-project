package com.example.csi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Controller
public class CustomErrorController implements ErrorController {

    @Autowired
    private RequestMappingHandlerMapping handlerMapping;
    
    @Autowired
    private ErrorAttributes errorAttributes;
    
    private final Map<String, String> mappingTimestamps = new ConcurrentHashMap<>();
    private boolean mappingsInitialized = false;
    private final DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @RequestMapping("/error")
    @ResponseBody
    public ResponseEntity<Object> handleError(
            HttpServletRequest request,
            @RequestHeader(value = "Accept", defaultValue = "text/html") String acceptHeader) {
        
        if (!mappingsInitialized) {
            initializeMappingTimestamps();
        }
        
        HttpStatus status = getStatus(request);
        
        String timestamp = LocalDateTime.now().format(dateFormatter);
        
        Map<String, Object> errorDetails = getErrorAttributes(request);
        String errorMessage = (String) errorDetails.getOrDefault("message", "Unknown error");
        String path = (String) errorDetails.getOrDefault("path", request.getRequestURI());
        
        if (acceptHeader.contains("application/json")) {
            Map<String, Object> body = new HashMap<>();
            body.put("timestamp", timestamp);
            body.put("status", status.value());
            body.put("error", status.getReasonPhrase());
            body.put("message", errorMessage);
            body.put("path", path);
            
            return ResponseEntity.status(status).body(body);
        } else {
            StringBuilder htmlResponse = new StringBuilder();
            htmlResponse.append("<!DOCTYPE html>\n");
            htmlResponse.append("<html lang=\"en\">\n");
            htmlResponse.append("<head>\n");
            htmlResponse.append("    <meta charset=\"UTF-8\">\n");
            htmlResponse.append("    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n");
            htmlResponse.append("    <title>").append(status.value()).append(" - ").append(status.getReasonPhrase()).append("</title>\n");
            htmlResponse.append("    <style>\n");
            htmlResponse.append("        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }\n");
            htmlResponse.append("        h1 { color: #d9534f; }\n");
            htmlResponse.append("        .error-details { background: #f8f9fa; padding: 15px; border-radius: 4px; margin-bottom: 20px; }\n");
            htmlResponse.append("        .method-group { margin-bottom: 25px; }\n");
            htmlResponse.append("        .method-name { background: #007bff; color: white; padding: 5px 10px; border-radius: 4px; }\n");
            htmlResponse.append("        ul { list-style-type: none; padding-left: 10px; }\n");
            htmlResponse.append("        li { padding: 5px 0; }\n");
            htmlResponse.append("        .timestamp { color: #6c757d; font-size: 0.9em; }\n");
            htmlResponse.append("        .mapping-info { display: flex; justify-content: space-between; }\n");
            htmlResponse.append("        .mapping-path { flex: 1; }\n");
            htmlResponse.append("        .mapping-handler { flex: 1; }\n");
            htmlResponse.append("        .mapping-timestamp { flex: 0.7; text-align: right; }\n");
            htmlResponse.append("    </style>\n");
            htmlResponse.append("</head>\n");
            htmlResponse.append("<body>\n");
            htmlResponse.append("    <h1>").append(status.value()).append(" - ").append(status.getReasonPhrase()).append("</h1>\n");
            htmlResponse.append("    <div class=\"error-details\">\n");
            htmlResponse.append("        <p><strong>Timestamp:</strong> <span class=\"timestamp\">").append(timestamp).append("</span></p>\n");
            htmlResponse.append("        <p><strong>Path:</strong> ").append(path).append("</p>\n");
            htmlResponse.append("        <p><strong>Message:</strong> ").append(errorMessage).append("</p>\n");
            htmlResponse.append("    </div>\n");
            htmlResponse.append("    <h2>Available Mappings</h2>\n");
            htmlResponse.append("    <p><small>Page generated at: ").append(timestamp).append("</small></p>\n");
            htmlResponse.append(getMappingsHtml());
            htmlResponse.append("</body>\n");
            htmlResponse.append("</html>");
            
            return ResponseEntity.status(status)
                    .header("Content-Type", "text/html")
                    .body(htmlResponse.toString());
        }
    }

    private void initializeMappingTimestamps() {
        String currentTime = LocalDateTime.now().format(dateFormatter);
        Map<RequestMappingInfo, HandlerMethod> map = handlerMapping.getHandlerMethods();
        
        for (Map.Entry<RequestMappingInfo, HandlerMethod> entry : map.entrySet()) {
            RequestMappingInfo info = entry.getKey();
            
            Set<String> patterns;
            try {
                patterns = info.getPathPatternsCondition().getPatternValues();
            } catch (Exception e) {
                try {
                    patterns = info.getPatternsCondition().getPatterns();
                } catch (Exception ex) {
                    patterns = Set.of(info.toString());
                }
            }
            
            Set<RequestMethod> methods = info.getMethodsCondition().getMethods();
            if (methods.isEmpty()) {
                methods = Set.of(RequestMethod.GET);
            }
            
            for (RequestMethod method : methods) {
                for (String pattern : patterns) {
                    String key = method + " " + pattern;
                    mappingTimestamps.put(key, currentTime);
                }
            }
        }
        
        mappingsInitialized = true;
    }

    private HttpStatus getStatus(HttpServletRequest request) {
        Integer statusCode = (Integer) request.getAttribute("javax.servlet.error.status_code");
        if (statusCode == null) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
        try {
            return HttpStatus.valueOf(statusCode);
        } catch (Exception ex) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    private Map<String, Object> getErrorAttributes(HttpServletRequest request) {
        WebRequest webRequest = new ServletWebRequest(request);
        ErrorAttributeOptions options = ErrorAttributeOptions.of(
                ErrorAttributeOptions.Include.MESSAGE,
                ErrorAttributeOptions.Include.BINDING_ERRORS,
                ErrorAttributeOptions.Include.EXCEPTION,
                ErrorAttributeOptions.Include.STACK_TRACE
        );
        return errorAttributes.getErrorAttributes(webRequest, options);
    }

    private String getMappingsHtml() {
        Map<RequestMappingInfo, HandlerMethod> map = handlerMapping.getHandlerMethods();
        
        Map<RequestMethod, List<Map<String, String>>> methodGroups = new TreeMap<>(Comparator.comparing(Enum::name));
        
        for (Map.Entry<RequestMappingInfo, HandlerMethod> entry : map.entrySet()) {
            RequestMappingInfo info = entry.getKey();
            
            Set<RequestMethod> methods = info.getMethodsCondition().getMethods();
            
            if (methods.isEmpty()) {
                methods = Set.of(RequestMethod.GET);
            }
            
            Set<String> patterns;
            try {
                patterns = info.getPathPatternsCondition().getPatternValues();
            } catch (Exception e) {
                try {
                    patterns = info.getPatternsCondition().getPatterns();
                } catch (Exception ex) {
                    patterns = Set.of(info.toString());
                }
            }
            
            for (RequestMethod method : methods) {
                if (!methodGroups.containsKey(method)) {
                    methodGroups.put(method, new ArrayList<>());
                }
                
                for (String pattern : patterns) {
                    String key = method + " " + pattern;
                    String mappingTimestamp = mappingTimestamps.getOrDefault(key, "Unknown");
                    
                    Map<String, String> mapping = new HashMap<>();
                    mapping.put("path", pattern);
                    mapping.put("handler", entry.getValue().getMethod().getDeclaringClass().getSimpleName() + "." + entry.getValue().getMethod().getName());
                    mapping.put("timestamp", mappingTimestamp);
                    methodGroups.get(method).add(mapping);
                }
            }
        }
        
        for (List<Map<String, String>> group : methodGroups.values()) {
            group.sort(Comparator.comparing(m -> m.get("path")));
        }
        
        StringBuilder html = new StringBuilder();
        
        for (Map.Entry<RequestMethod, List<Map<String, String>>> entry : methodGroups.entrySet()) {
            html.append("<div class=\"method-group\">\n");
            html.append("    <h3><span class=\"method-name\">").append(entry.getKey()).append("</span></h3>\n");
            html.append("    <ul>\n");
            
            for (Map<String, String> mapping : entry.getValue()) {
                html.append("        <li>\n");
                html.append("            <div class=\"mapping-info\">\n");
                html.append("                <div class=\"mapping-path\"><strong>").append(mapping.get("path")).append("</strong></div>\n");
                html.append("                <div class=\"mapping-handler\">").append(mapping.get("handler")).append("</div>\n");
                html.append("                <div class=\"mapping-timestamp\"><span class=\"timestamp\">").append(mapping.get("timestamp")).append("</span></div>\n");
                html.append("            </div>\n");
                html.append("        </li>\n");
            }
            
            html.append("    </ul>\n");
            html.append("</div>\n");
        }
        
        return html.toString();
    }
}
