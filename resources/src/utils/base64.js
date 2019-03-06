let base64Encoder = window.btoa;

if (typeof base64Encoder !== "function") {
	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	let encLookup = [];
	let i = 0;
	
	for (i = 0; i < 4096; i += 1) {
		encLookup[i] = chars[i >> 6] + chars[i & 0x3F];
	}
	
	base64Encoder = src => {
		let bytes = [], i = 0, len = src.length, dst = '', n, n1, n2, n3;
		// to bytes
		for (i = 0; i < src.length; i += 1) {
			bytes.push(src.charCodeAt(i));
		}
		src = bytes;
		for (i = 0; len > 2; i += 3, len -= 3) {
			n = (src[i] << 16) | (src[i + 1] << 8) | src[i + 2];
			dst += encLookup[n >> 12] + encLookup[n & 0xFFF];
		}
		if (len > 0) {
			n1 = (src[i] & 0xFC) >> 2;
			n2 = (src[i] & 0x03) << 4;
			if (len > 1) {
				n2 |= (src[i += 1] & 0xF0) >> 4;
			}
			dst += chars[n1];
			dst += chars[n2];
			if (len === 2) {
				n3 = (src[i += 1] & 0x0F) << 2;
				n3 |= (src[i] & 0xC0) >> 6;
				dst += chars[n3];
			}
			if (len === 1) {
				dst += '=';
			}
			dst += '=';
		}
		return dst;
	};
}


export default {
	encode: base64Encoder
};

