export default function Hashing(key:string): string {
    var hash = 0;
    if (key.length == 0) {
        return String(hash);
    }
    for (var i = 0; i < key.length; i++) {
        var char = key.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return String(hash);
  }