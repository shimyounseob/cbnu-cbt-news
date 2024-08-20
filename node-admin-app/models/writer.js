module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "writer",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
                comment: "기자 고유번호",
            },
            korean_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: "기자 한글명",
            },
            english_name: {
                type: DataTypes.STRING(100),
                allowNull: true,
                comment: "기자 영문명",
            },
            photo: {
                type: DataTypes.STRING(255),
                allowNull: true,
                comment: "기자 사진 URL",
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: true,
                comment: "기자 이메일",
            },
            department: {
                type: DataTypes.STRING(100),
                allowNull: true,
                comment: "학과",
            },
            student_number: {
                type: DataTypes.STRING(20),
                allowNull: true,
                comment: "학번",
            },
            position: {
                type: DataTypes.STRING(100),
                allowNull: true,
                comment: "기자 직책",  // 새로운 직책 컬럼 추가
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
                comment: "기자 정보 등록일",
            },
            created_by: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: "기자 정보 등록자",
            },
            updated_by: {
                type: DataTypes.STRING(100),
                allowNull: true,
                comment: "기자 정보 수정자",
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: "기자 정보 수정일",
            },
            used_yn_code: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1, // 기본값을 '사용함'으로 설정
                comment: "사용 여부 (1: 사용함, 0: 사용안함)",
            },
        },
        {
            sequelize,
            tableName: "writer",
            timestamps: false, // true로 설정 시 created_at, updated_at 필드를 자동으로 관리함
            comment: "기자 정보 테이블",
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "id" }],
                },
            ],
        }
    );
};
