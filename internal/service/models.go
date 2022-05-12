/*
MIT License

Copyright (c) 2022 r7wx

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

package service

type service struct {
	Icon  string `json:"icon"`
	Name  string `json:"name"`
	URL   string `json:"url"`
	Category int `json:"category"`
}

type category struct {
	Id 	  		int    `json:"id"`
	Title 		string `json:"title"`
	Description string `json:"description"`
}

type note struct {
	Name string `json:"name"`
	Text string `json:"text"`
}

type theme struct {
	Background string `json:"background"`
	Foreground string `json:"foreground"`
}

type response struct {
	Error      string    `json:"error"`
	Theme      theme     `json:"theme"`
	Title      string    `json:"title"`
	Icon       string    `json:"icon"`
	Motd       string    `json:"motd"`
	Services   []service `json:"services"`
	Categories []category `json:"categories"`
	Notes      []note    `json:"notes"`
}
