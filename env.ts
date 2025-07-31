import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenAiService {
  private apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
  private apiKey = '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'; // Replace with your actual key

  constructor(private http: HttpClient) {}

  // sendMessage(message: string): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${this.apiKey}`,
  //   });

  //   const body = {
  //     model: 'meta-llama/llama-4-scout-17b-16e-instruct',
  //     messages: [
  //       {
  //         role: 'user',
  //         content: message,
  //       },
  //     ],
  //   };

  //   return this.http.post<any>(this.apiUrl, body, { headers });
  // }

  sendMessage(message: string, chatHistory: { role: string; content: string }[]) {
  return this.http.post<any>(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      messages: chatHistory, // Pass full conversation with system prompt
    },
    {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    }
  );
}

}
