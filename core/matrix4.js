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

		var a00 = this.array[0];
		var a01 = this.array[1];
		var a02 = this.array[2];
		var a03 = this.array[3];
		var a10 = this.array[4];
		var a11 = this.array[5];
		var a12 = this.array[6];
		var a13 = this.array[7];
		var a20 = this.array[8];
		var a21 = this.array[9];
		var a22 = this.array[10];
		var a23 = this.array[11];
		var a30 = this.array[12];
		var a31 = this.array[13];
		var a32 = this.array[14];
		var a33 = this.array[15];

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
			b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
			b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
			b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
			b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
			b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
			b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
			b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
			b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
			b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
			b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
			b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
			b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
			b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
			b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
			b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
			b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33
		]);

		return this;

	}
	inverse(){

		var m00 = this.array[0];
		var m01 = this.array[1];
		var m02 = this.array[2];
		var m03 = this.array[3];
		var m10 = this.array[4];
		var m11 = this.array[5];
		var m12 = this.array[6];
		var m13 = this.array[7];
		var m20 = this.array[8];
		var m21 = this.array[9];
		var m22 = this.array[10];
		var m23 = this.array[11];
		var m30 = this.array[12];
		var m31 = this.array[13];
		var m32 = this.array[14];
		var m33 = this.array[15];

		var tmp_0 = m22 * m33;
		var tmp_1 = m32 * m23;
		var tmp_2 = m12 * m33;
		var tmp_3 = m32 * m13;
		var tmp_4 = m12 * m23;
		var tmp_5 = m22 * m13;
		var tmp_6 = m02 * m33;
		var tmp_7 = m32 * m03;
		var tmp_8 = m02 * m23;
		var tmp_9 = m22 * m03;
		var tmp_10 = m02 * m13;
		var tmp_11 = m12 * m03;
		var tmp_12 = m20 * m31;
		var tmp_13 = m30 * m21;
		var tmp_14 = m10 * m31;
		var tmp_15 = m30 * m11;
		var tmp_16 = m10 * m21;
		var tmp_17 = m20 * m11;
		var tmp_18 = m00 * m31;
		var tmp_19 = m30 * m01;
		var tmp_20 = m00 * m21;
		var tmp_21 = m20 * m01;
		var tmp_22 = m00 * m11;
		var tmp_23 = m10 * m01;

		var t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) - (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
		var t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) - (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
		var t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) - (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
		var t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) - (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

		var determinant = (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

		if( determinant == 0 ){

			console.error("Matrix4 error: cannot inverse matrix, determinant is equal to 0");

			this.setIdentity();

			return this;

		};

		var invertedDeterminant = (1.0 / determinant);

		this.set([
			invertedDeterminant * t0,
			invertedDeterminant * t1,
			invertedDeterminant * t2,
			invertedDeterminant * t3,
			invertedDeterminant * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) - (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30)),
			invertedDeterminant * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) - (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30)),
			invertedDeterminant * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) - (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30)),
			invertedDeterminant * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) - (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20)),
			invertedDeterminant * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) - (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33)),
			invertedDeterminant * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) - (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33)),
			invertedDeterminant * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) - (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33)),
			invertedDeterminant * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) - (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23)),
			invertedDeterminant * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) - (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22)),
			invertedDeterminant * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) - (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02)),
			invertedDeterminant * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) - (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12)),
			invertedDeterminant * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) - (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02))
		]);

		return this;

	}
	transpose(){

		var clone = this.clone();

		this.set([
			clone.array[0], clone.array[4], clone.array[8], clone.array[12],
			clone.array[1], clone.array[5], clone.array[9], clone.array[13],
			clone.array[2], clone.array[6], clone.array[10], clone.array[14],
			clone.array[3], clone.array[7], clone.array[11], clone.array[15]
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

		};

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