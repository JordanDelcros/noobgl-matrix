import { Vector3 } from "noobgl-vector";
import { Euler } from "noobgl-euler";

const IDENTITY = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

export default class Matrix4 {
	constructor( matrix = null ){

		this.array = new Float32Array(16);

		if( matrix != null ){

			this.set(matrix);

		}
		else {

			this.setIdentity();

		};

		return this;

	}
	get m11(){

		return this.array[0];

	}
	get m21(){

		return this.array[1];

	}
	get m31(){

		return this.array[2];

	}
	get m41(){

		return this.array[3];

	}
	get m12(){

		return this.array[4];

	}
	get m22(){

		return this.array[5];

	}
	get m32(){

		return this.array[6];

	}
	get m42(){

		return this.array[7];

	}
	get m13(){

		return this.array[8];

	}
	get m23(){

		return this.array[9];

	}
	get m33(){

		return this.array[10];

	}
	get m43(){

		return this.array[11];

	}
	get m14(){

		return this.array[12];

	}
	get m24(){

		return this.array[13];

	}
	get m34(){

		return this.array[14];

	}
	get m44(){

		return this.array[15];

	}
	get determinant(){

		var tmp_0 = this.m33 * this.m44;
		var tmp_1 = this.m34 * this.m43;
		var tmp_2 = this.m32 * this.m44;
		var tmp_3 = this.m34 * this.m42;
		var tmp_4 = this.m32 * this.m43;
		var tmp_5 = this.m33 * this.m42;
		var tmp_6 = this.m31 * this.m44;
		var tmp_7 = this.m34 * this.m41;
		var tmp_8 = this.m31 * this.m43;
		var tmp_9 = this.m33 * this.m41;
		var tmp_10 = this.m31 * this.m42;
		var tmp_11 = this.m32 * this.m41;
		var tmp_12 = this.m13 * this.m24;
		var tmp_13 = this.m14 * this.m23;
		var tmp_14 = this.m12 * this.m24;
		var tmp_15 = this.m14 * this.m22;
		var tmp_16 = this.m12 * this.m23;
		var tmp_17 = this.m13 * this.m22;
		var tmp_18 = this.m11 * this.m24;
		var tmp_19 = this.m14 * this.m21;
		var tmp_20 = this.m11 * this.m23;
		var tmp_21 = this.m13 * this.m21;
		var tmp_22 = this.m11 * this.m22;
		var tmp_23 = this.m12 * this.m21;

		return (
			this.m11 * (tmp_0 * this.m22 + tmp_3 * this.m23 + tmp_4 * this.m24) - (tmp_1 * this.m22 + tmp_2 * this.m23 + tmp_5 * this.m24)
		+ 	this.m12 * (tmp_1 * this.m21 + tmp_6 * this.m23 + tmp_9 * this.m24) - (tmp_0 * this.m21 + tmp_7 * this.m23 + tmp_8 * this.m24)
		+ 	this.m13 * (tmp_2 * this.m21 + tmp_7 * this.m22 + tmp_10 * this.m24) - (tmp_3 * this.m21 + tmp_6 * this.m22 + tmp_11 * this.m24)
		+ 	this.m14 * (tmp_5 * this.m21 + tmp_8 * this.m22 + tmp_11 * this.m23) - (tmp_4 * this.m21 + tmp_9 * this.m22 + tmp_10 * this.m23)
		);

	}
	get invertedDeterminant(){

		return (1.0 / this.determinant);

	}
	get scaling(){

		var scaleX = Vector3.length(this.m11, this.m21, this.m31);

		var scaleY = Vector3.length(this.m12, this.m22, this.m32);

		var scaleZ = Vector3.length(this.m13, this.m23, this.m33);

		if( this.determinant < 0 ){

			scaleX *= -1;

		}

		return new Vector3(scaleX, scaleY, scaleZ);

	}
	get rotation(){

		var scaling = this.scaling;

		var rotationMatrix = new Matrix4([
			(this.m11 / scaling.x), (this.m21 / scaling.y), (this.m31 / scaling.z), 0,
			(this.m12 / scaling.x), (this.m22 / scaling.y), (this.m32 / scaling.z), 0,
			(this.m13 / scaling.x), (this.m23 / scaling.x), (this.m33 / scaling.x), 0,
			0, 0, 0, 1
		]);

		return Euler.from(rotationMatrix);

	}
	set( matrix, offset = 0 ){

		if( matrix instanceof Matrix4 ){

			matrix = matrix.array;

		};

		this.array.set(matrix, offset);

		return this;

	}
	setIdentity(){

		this.set(IDENTITY);

		return this;

	}
	multiply( matrix ){

		if( matrix instanceof Matrix4 ){

			matrix = matrix.array;

		};

		var b00 = matrix[0];
		var b01 = matrix[1];
		var b02 = matrix[2];
		var b03 = matrix[3];
		var b10 = matrix[4];
		var b11 = matrix[5];
		var b12 = matrix[6];
		var b13 = matrix[7];
		var b20 = matrix[8];
		var b21 = matrix[9];
		var b22 = matrix[10];
		var b23 = matrix[11];
		var b30 = matrix[12];
		var b31 = matrix[13];
		var b32 = matrix[14];
		var b33 = matrix[15];

		this.set([
			b00 * this.m11 + b01 * this.m12 + b02 * this.m13 + b03 * this.m14,
			b00 * this.m21 + b01 * this.m22 + b02 * this.m23 + b03 * this.m24,
			b00 * this.m31 + b01 * this.m32 + b02 * this.m33 + b03 * this.m34,
			b00 * this.m41 + b01 * this.m42 + b02 * this.m43 + b03 * this.m44,
			b10 * this.m11 + b11 * this.m12 + b12 * this.m13 + b13 * this.m14,
			b10 * this.m21 + b11 * this.m22 + b12 * this.m23 + b13 * this.m24,
			b10 * this.m31 + b11 * this.m32 + b12 * this.m33 + b13 * this.m34,
			b10 * this.m41 + b11 * this.m42 + b12 * this.m43 + b13 * this.m44,
			b20 * this.m11 + b21 * this.m12 + b22 * this.m13 + b23 * this.m14,
			b20 * this.m21 + b21 * this.m22 + b22 * this.m23 + b23 * this.m24,
			b20 * this.m31 + b21 * this.m32 + b22 * this.m33 + b23 * this.m34,
			b20 * this.m41 + b21 * this.m42 + b22 * this.m43 + b23 * this.m44,
			b30 * this.m11 + b31 * this.m12 + b32 * this.m13 + b33 * this.m14,
			b30 * this.m21 + b31 * this.m22 + b32 * this.m23 + b33 * this.m24,
			b30 * this.m31 + b31 * this.m32 + b32 * this.m33 + b33 * this.m34,
			b30 * this.m41 + b31 * this.m42 + b32 * this.m43 + b33 * this.m44
		]);

		return this;

	}
	inverse(){

		if( this.determinant == 0 ){

			console.error("Matrix4 error: cannot inverse matrix, determinant is equal to 0");

			this.setIdentity();

			return this;

		};

		var invertedDeterminant = this.invertedDeterminant;

		var tmp_0 = this.m33 * this.m44;
		var tmp_1 = this.m34 * this.m43;
		var tmp_2 = this.m32 * this.m44;
		var tmp_3 = this.m34 * this.m42;
		var tmp_4 = this.m32 * this.m43;
		var tmp_5 = this.m33 * this.m42;
		var tmp_6 = this.m31 * this.m44;
		var tmp_7 = this.m34 * this.m41;
		var tmp_8 = this.m31 * this.m43;
		var tmp_9 = this.m33 * this.m41;
		var tmp_10 = this.m31 * this.m42;
		var tmp_11 = this.m32 * this.m41;
		var tmp_12 = this.m13 * this.m24;
		var tmp_13 = this.m14 * this.m23;
		var tmp_14 = this.m12 * this.m24;
		var tmp_15 = this.m14 * this.m22;
		var tmp_16 = this.m12 * this.m23;
		var tmp_17 = this.m13 * this.m22;
		var tmp_18 = this.m11 * this.m24;
		var tmp_19 = this.m14 * this.m21;
		var tmp_20 = this.m11 * this.m23;
		var tmp_21 = this.m13 * this.m21;
		var tmp_22 = this.m11 * this.m22;
		var tmp_23 = this.m12 * this.m21;

		this.set([
			invertedDeterminant * (tmp_0 * this.m22 + tmp_3 * this.m23 + tmp_4 * this.m24) - (tmp_1 * this.m22 + tmp_2 * this.m23 + tmp_5 * this.m24),
			invertedDeterminant * (tmp_1 * this.m21 + tmp_6 * this.m23 + tmp_9 * this.m24) - (tmp_0 * this.m21 + tmp_7 * this.m23 + tmp_8 * this.m24),
			invertedDeterminant * (tmp_2 * this.m21 + tmp_7 * this.m22 + tmp_10 * this.m24) - (tmp_3 * this.m21 + tmp_6 * this.m22 + tmp_11 * this.m24),
			invertedDeterminant * (tmp_5 * this.m21 + tmp_8 * this.m22 + tmp_11 * this.m23) - (tmp_4 * this.m21 + tmp_9 * this.m22 + tmp_10 * this.m23),
			invertedDeterminant * ((tmp_1 * this.m12 + tmp_2 * this.m13 + tmp_5 * this.m14) - (tmp_0 * this.m12 + tmp_3 * this.m13 + tmp_4 * this.m14)),
			invertedDeterminant * ((tmp_0 * this.m11 + tmp_7 * this.m13 + tmp_8 * this.m14) - (tmp_1 * this.m11 + tmp_6 * this.m13 + tmp_9 * this.m14)),
			invertedDeterminant * ((tmp_3 * this.m11 + tmp_6 * this.m12 + tmp_11 * this.m14) - (tmp_2 * this.m11 + tmp_7 * this.m12 + tmp_10 * this.m14)),
			invertedDeterminant * ((tmp_4 * this.m11 + tmp_9 * this.m12 + tmp_10 * this.m13) - (tmp_5 * this.m11 + tmp_8 * this.m12 + tmp_11 * this.m13)),
			invertedDeterminant * ((tmp_12 * this.m42 + tmp_15 * this.m43 + tmp_16 * this.m44) - (tmp_13 * this.m42 + tmp_14 * this.m43 + tmp_17 * this.m44)),
			invertedDeterminant * ((tmp_13 * this.m41 + tmp_18 * this.m43 + tmp_21 * this.m44) - (tmp_12 * this.m41 + tmp_19 * this.m43 + tmp_20 * this.m44)),
			invertedDeterminant * ((tmp_14 * this.m41 + tmp_19 * this.m42 + tmp_22 * this.m44) - (tmp_15 * this.m41 + tmp_18 * this.m42 + tmp_23 * this.m44)),
			invertedDeterminant * ((tmp_17 * this.m41 + tmp_20 * this.m42 + tmp_23 * this.m43) - (tmp_16 * this.m41 + tmp_21 * this.m42 + tmp_22 * this.m43)),
			invertedDeterminant * ((tmp_14 * this.m33 + tmp_17 * this.m34 + tmp_13 * this.m32) - (tmp_16 * this.m34 + tmp_12 * this.m32 + tmp_15 * this.m33)),
			invertedDeterminant * ((tmp_20 * this.m34 + tmp_12 * this.m31 + tmp_19 * this.m33) - (tmp_18 * this.m33 + tmp_21 * this.m34 + tmp_13 * this.m31)),
			invertedDeterminant * ((tmp_18 * this.m32 + tmp_23 * this.m34 + tmp_15 * this.m31) - (tmp_22 * this.m34 + tmp_14 * this.m31 + tmp_19 * this.m32)),
			invertedDeterminant * ((tmp_22 * this.m33 + tmp_16 * this.m31 + tmp_21 * this.m32) - (tmp_20 * this.m32 + tmp_23 * this.m33 + tmp_17 * this.m31))
		]);

		return this;

	}
	transpose(){

		this.set([
			this.m11, this.m12, this.m13, this.m14,
			this.m21, this.m22, this.m23, this.m24,
			this.m31, this.m32, this.m33, this.m34,
			this.m41, this.m42, this.m43, this.m44
		]);

		return this;

	}
	translateX( translation ){

		var translationMatrix = new Matrix4([
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			translation, 0, 0, 1
		]);

		this.multiply(translationMatrix);

		return this;

	}
	translateY( translation ){

		var translationMatrix = new Matrix4([
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, translation, 0, 1
		]);

		this.multiply(translationMatrix);

		return this;

	}
	translateZ( translation ){

		var translationMatrix = new Matrix4([
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, translation, 1
		]);

		this.multiply(translationMatrix);

		return this;

	}
	translate( x, y, z ){

		this.translateX(x);

		this.translateY(y);

		this.translateZ(z);

		return this;

	}
	scaleX( scaling ){

		var scalingMatrix = new Matrix4([
			scaling, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		]);

		this.multiply(scalingMatrix);

		return this;

	}
	scaleY( scaling ){

		var scalingMatrix = new Matrix4([
			1, 0, 0, 0,
			0, scaling, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		]);

		this.multiply(scalingMatrix);

		return this;

	}
	scaleZ( scaling ){

		var scalingMatrix = new Matrix4([
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, scaling, 0,
			0, 0, 0, 1
		]);

		this.multiply(scalingMatrix);

		return this;

	}
	scale( x, y, z ){

		this.scaleX(x);

		this.scaleY(y);

		this.scaleZ(z);

		return this;

	}
	rotateX( angle ){

		var cos = Math.cos(angle);

		var sin = Math.sin(angle);

		var rotationMatrix = new Matrix4([
			1, 0, 0, 0,
			0, cos, sin, 0,
			0, -sin, cos, 0,
			0, 0, 0, 1
		]);

		this.multiply(rotationMatrix);

		return this;

	}
	rotateY( angle ){

		var cos = Math.cos(angle);

		var sin = Math.sin(angle);

		var rotationMatrix = new Matrix4([
			cos, 0, -sin, 0,
			0, 1, 0, 0,
			sin, 0, cos, 0,
			0, 0, 0, 1
		]);

		this.multiply(rotationMatrix);

		return this;

	}
	rotateZ( angle ){

		var cos = Math.cos(angle);

		var sin = Math.sin(angle);

		var rotationMatrix = new Matrix4([
			cos, sin, 0, 0,
			-sin, cos, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		]);

		this.multiply(rotationMatrix);

		return this;

	}
	rotate( x, y, z, order = "XYZ" ){

		switch( order ){

			case "XYZ":

				this.rotateX(x).rotateY(y).rotateZ(z);

				break;

			case "XZY":

				this.rotateX(x).rotateZ(z).rotateY(y);

				break;

			case "YXZ":

				this.rotateY(y).rotateX(x).rotateZ(z);

				break;

			case "YZX":

				this.rotateY(y).rotateZ(z).rotateX(x);

				break;

			case "ZXY":

				this.rotateZ(z).rotateX(x).rotateY(y);

				break;

			case "ZYX":

				this.rotateZ(z).rotateY(y).rotateX(x);

				break;

			default:

				this.rotateX(x).rotateY(y).rotateZ(z);

				break;

		}

		return this;

	}
	rotateAround( x, y, z, angle ){

		var normalizer = Math.sqrt(x * x + y * y + z * z);

		x /= normalizer;

		y /= normalizer;

		z /= normalizer;

		var squaredX = x * x;

		var squaredY = y * y;

		var squaredZ = z * z;

		var cos = Math.cos(angle);

		var sin = Math.sin(angle);

		var oneMinusCos = 1 - cos;

		var rotationMatrix = new Matrix4([
			squaredX + ((1 - squaredX) * cos), (x * y * oneMinusCos) + (z * sin), (x * z * oneMinusCos) - (y * sin), 0,
			(x * y * oneMinusCos) - (z * sin), squaredY + ((1 - squaredY) * cos), (y * z * oneMinusCos) + (x * sin), 0,
			(x * z * oneMinusCos) + (y * sin), (y * z * oneMinusCos) - (x * sin), squaredZ + ((1 - squaredZ) * cos), 0,
			0, 0, 0, 1
		]);

		this.multiply(rotationMatrix);

		return this;

	}
	clone(){

		return new Matrix4(this);

	}
}