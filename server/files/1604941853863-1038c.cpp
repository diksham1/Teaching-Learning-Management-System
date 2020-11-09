
#include <bits/stdc++.h>

using namespace std;
typedef long long ll;

void solve() {
	ll n;
	cin >> n;
	vector<ll> a(n), b(n);
	for (ll i = 0; i < n; i++)
		cin >> a[i];

	for (ll i = 0; i < n; i++)
		cin >> b[i];

	sort(a.begin(), a.end());
	sort(b.begin(), b.end());

	ll p1 = n-1, p2 = n-1;
	ll scorea = 0, scoreb = 0;		
	ll i;
	for (i = 0; i < 2*n && (p1>= 0) && (p2 >= 0); i++) {
		if (i % 2 == 0) {	// a's turn 
			if (a[p1] >= b[p2]) {
				scorea += a[p1--];
			}	else {
				p2--;
			}
		} else {
			if (b[p2] >= a[p1]) {
				scoreb += b[p2--];
			} else {
				p1--;
			}
		}
	}
	
	while (i < 2*n && (p1>= 0)) {
		if (i % 2 == 0)	scorea += a[p1--];
		else	 p1--;
		i++;
	}

	while (i < 2*n && (p2>= 0)) {
		if (i % 2 != 0)	scoreb += b[p2--];
		else	 p2--;
		i++;
	}

	cout << scorea - scoreb << endl;
}

int main() {
  ll t = 1;
  //cin >> t;
 
  while (t--) {
    solve();
  }

  return 0;
}
